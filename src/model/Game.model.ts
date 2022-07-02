import mongoose, { Document, model, Schema } from "mongoose";
import { uuid } from "uuidv4";
import { GameStatusEnum } from "../shared/enums/Game.enum";
import { PlayerInterface } from "../shared/interfaces/Player.interface";
import { PlayerSchema } from "./schemas/player.schema";

export interface GameInterfaceEntity extends Document {
    id: string
    players: PlayerInterface[]
    squares: string[]
    status: GameStatusEnum
    lastMove: PlayerInterface
}

const gameSchema = () => {
    const model = new mongoose.Schema({
        id: {
            type: String,
            required: true
        },
        players: {
            type: [PlayerSchema],
        },
        status: {
            type: String,
            enum: Object.values(GameStatusEnum),
            default: GameStatusEnum.OPEN,
            required: true,
        },
        squares: {
            type: [String],
            required: true,
        },
        lastMove: {
            type: PlayerSchema
        },
    })

    // model.pre('save', function (next) {

        
    //     if (!this.get('id')) {
    //         this.set('id', uuid())
    //     }
    //     next()
    // })

    return model
}

const schema = gameSchema()

export const GameModel = model<GameInterfaceEntity>('game', schema, 'games')

