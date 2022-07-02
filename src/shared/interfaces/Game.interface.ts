import { GameStatusEnum } from "../enums/Game.enum";
import { PlayerInterface } from "./Player.interface";

export interface GameInterface {
    id?: string
    players?: PlayerInterface[]
    squares: string[]
    status: GameStatusEnum
    lastMove?: PlayerInterface
}

export interface GameRepositoryInterface {
    findAndUpdateGame(game: GameInterface): Promise<GameInterface>
    createGame(game: GameInterface): Promise<GameInterface>
    findById(id: string): Promise<GameInterface | null>
    findByStatus(status: GameStatusEnum): Promise<GameInterface | null>
}

export interface MoveUseCaseParams {
    square: number
    gameId: string
    playerId: string
}

export interface GameOverInterface {
    winner?: PlayerInterface
    over: boolean
}