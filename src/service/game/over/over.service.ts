import { GameRepository } from "../../../repositories/Game.repository";
import { GameInterface } from "../../../shared/interfaces/Game.interface";

export class OverService {
    private repository

    constructor() {
        this.repository = new GameRepository()
    }

    async updateGame(game: GameInterface): Promise<GameInterface> {
        return this.repository.findAndUpdateGame(game)
    }
}