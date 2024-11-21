export interface LoginRequestDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    token: string;
    user: {
        email: string;
        role: string;
    };
}