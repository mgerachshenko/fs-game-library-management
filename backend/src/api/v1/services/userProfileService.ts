import prisma from "../../../../prisma/client";

export const getUserProfileById = async (id: string) => {
    return prisma.userProfile.findUnique({
        where: { id },
    });
};

export const updateUserProfile = async (
    id: string,
    data: {
        displayName?: string;
        bio?: string;
        avatarUrl?: string;
    },
) => {
    return prisma.userProfile.update({
        where: { id },
        data,
    });
};
