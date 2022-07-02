import { GameRepository } from "../../../repositories/Game.repository";
import { GameInterface } from "../../../shared/interfaces/Game.interface";

export class MoveService {
    private repository: GameRepository

    constructor() {
        this.repository = new GameRepository()
    }
    
    async findGameAndValidatePlayer(gameId: string, playerId: string) {
        const game = await this.repository.findById(gameId)
        if (game && (game.players?.map(data => data.id).includes(playerId))) {
            return game            
        }
        
        return null
    }

    async updateGame(game: GameInterface): Promise<GameInterface> {
        return this.repository.findAndUpdateGame(game)
    }
    
}