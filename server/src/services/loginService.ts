import {LoginRequestDto, LoginResponseDto} from "../types/dtos/auth/LoginDto";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginService = async (data: LoginRequestDto): Promise<LoginResponseDto> => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        { guid: user.guid, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );
    return {
        token: token,
        user: {
            email: user.email,
            role: user.role
        }
    }
}