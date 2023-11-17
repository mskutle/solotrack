import {prisma} from "~/db/prisma-client";
import {v4 as uuid} from "uuid";
import {CreateUserInput} from "~/db/save-user";

export async function createNewUser(input: CreateUserInput) {
  const {firstName, lastName, email, photoUrl} = input;
  const userId = uuid();

  const team = await prisma.team.create({
    data: {
      id: uuid(),
      name: `${firstName} ${lastName} Personal Team`,
      isPersonal: true,
      members: {
        create: {
          id: userId,
          email,
          firstName,
          lastName,
          photoUrl,
        },
      },
    },
    select: {
      members: {
        where: {id: userId},
      },
    },
  });

  console.log(team);

  return team.members[0];
}
