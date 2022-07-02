import { uuid } from "uuidv4";
import { GameRepository } from "../../../repositories/Game.repository";
import { GameStatusEnum } from "../../../shared/enums/Game.enum";
import { GameInterface as GameEntityInterface, GameInterface } from "../../../shared/interfaces/Game.interface";

export class StartService {
    private repository: GameRepository

    constructor() {
        this.repository = new GameRepository()
    }

    async findOrCreateOpenGame(): Promise<GameInterface> {
        const game = await this.repository.findByStatus(GameStatusEnum.OPEN)
        
        if (game) {
            return game
        }

        const newGame: GameInterface = {
            squares: Array(9).fill(''),
            status: GameStatusEnum.OPEN,
            id: uuid()
        }

        return this.repository.createGame(newGame)
    }

    async updateGame(game: GameInterface): Promise<GameInterface> {
        return this.repository.findAndUpdateGame(game)
    }
}