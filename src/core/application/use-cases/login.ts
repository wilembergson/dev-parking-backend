import { Encrypter, HashComparer } from "@application/protocols/cryptografy";
import { UserNotFound } from "@domain/exceptions";
import { UserRepository } from "@domain/repositories";
import { Login } from "@domain/use-cases/auth";

export class LoginUseCase implements Login {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter
    ) { }

    async execute(input: Login.Input): Promise<Login.Output | null> {
        const foundUser = await this.userRepository.findOne({ email: input.email });
        if (!foundUser) throw new UserNotFound();
        const userState = foundUser.getState()
        const isValid = await this.hashComparer.compare(input.password, userState.password)
        if (!isValid) return null
        const token = await this.encrypter.encrypt({
            name: userState.name
        })
        return { token }
    }
}