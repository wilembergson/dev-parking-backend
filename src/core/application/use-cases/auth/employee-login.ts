import { Encrypter, HashComparer } from "@application/protocols/cryptografy";
import { UserNotFound, WrongPassword } from "@domain/exceptions";
import { EmployeeUserRepository } from "@domain/repositories";
import { Login } from "@domain/use-cases/auth";

export class EmployeeLoginUseCase implements Login {
    constructor(
        private readonly userRepository: EmployeeUserRepository,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter
    ) { }

    async execute(input: Login.Input): Promise<Login.Output> {
        const foundUser = await this.userRepository.findOne({ email: input.email });
        if (!foundUser) throw new UserNotFound();
        const userState = foundUser.getState()
        const isValid = await this.hashComparer.compare(input.password, userState.password)
        if (!isValid) throw new WrongPassword()
        const token = await this.encrypter.encrypt({
            id: userState.id,
            name: userState.name
        })
        return { token }
    }
}