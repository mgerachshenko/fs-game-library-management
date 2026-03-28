import prisma from "../../../../prisma/client";

export const createUserProfile = async (data: {
    id: string;
    name: string;
    displayName: string;
    bio?: string;
    avatarUrl?: string;
}) => {
    return prisma.userProfile.create({
        data: {
            ...data,
            updatedAt: new Date(),
        },
    });
};

export const getAllUserProfiles = async () => {
    return prisma.userProfile.findMany();
};

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

export const deleteUserProfile = async (id: string) => {
    return prisma.userProfile.delete({
        where: { id },
    });
};
