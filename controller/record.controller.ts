import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Record from '../model/Record';
import jwt from 'jsonwebtoken';
import { v1 as uuidv1 } from 'uuid';
import path from 'path';
import fs from 'fs';

const getRecords = async (req: Request, res: Response) => {
    try {
        const page = req.params.page || 1;

        const recordRepository = getRepository(Record);

        const records = await recordRepository.findAndCount({
            take: 20,
            skip: 20 * <number>page - 20,
        });

        return res.status(200).json({
            records: records[0],
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(503);
    }
};

const editRecord = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        const recordRepository = getRepository(Record);
        const recordId = req.params.recordId;
        const token = req.headers['authorization']?.split(' ')[1];
        const payload = jwt.decode(token!) as { userId: number };
        const record = await recordRepository.findOne(recordId, {
            relations: ['user'],
        });
        if (!(record?.user.id === payload.userId)) return res.sendStatus(401);
        if (file) {
            const fileExist = req.file!.originalname.split('.').pop();
            const folderPatch = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(folderPatch)) {
                fs.mkdirSync(folderPatch, { recursive: true });
            }
            const fileName = uuidv1() + '.' + fileExist;
            fs.writeFileSync(path.resolve(folderPatch, fileName), req.file!.buffer);
            await recordRepository.update(record.id, {
                typeMessage: 'file',
                message: fileName,
            });
            return res.sendStatus(201);
        }
        const message = req.body.message as string;

        await recordRepository.update(record.id, {
            message,
        });

        return res.sendStatus(201);
    } catch (e) {
        console.log(e);
        return res.sendStatus(501);
    }
};

const deleteRecord = async (req: Request, res: Response) => {
    try {
        const recordId = req.params.recordId;
        const token = req.headers['authorization']?.split(' ')[1];
        const recordRepository = getRepository(Record);
        const payload = jwt.decode(token!) as { userId: number };
        const record = await recordRepository.findOne(recordId, {
            relations: ['user'],
        });

        if (!(record?.user.id === payload.userId)) return res.sendStatus(401);

        await recordRepository.delete(record.id);

        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(501);
    }
};

export default { getRecords, editRecord, deleteRecord };
