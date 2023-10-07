import { prisma } from "./prisma-client";

async function emptyDb() {
  await prisma.project.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  await emptyDb();

  const magne = await prisma.user.create({
    data: {
      id: "117310930967543272705",
      email: "magne.skutle@gmail.com",
      firstName: "Magne",
      lastName: "Skutle",
      photoUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocJS139lS3Gb82XcGxqV3jSbz2cKQNFaooT83xQLrRUhg5Q=s96-c",
    },
  });

  const brage = await prisma.client.create({
    data: {
      id: "3968836c-c725-401b-9e5d-0cc99a254551",
      userId: magne.id,
      name: "Brage Finans",
    },
  });

  await prisma.project.create({
    data: {
      id: "3968836c-c725-401b-9e5d-0cc99a254552",
      name: "Min Side 2.0",
      clientId: brage.id,
      ownerId: magne.id,
      startedAt: "2021-09-01T00:00:00Z",
      description: `
        Ansvar for arkitektur og teknologivalg, gjennomgang av eksisterende løsning (.NET) og sikre at vi fikk med eksisterende funksjonalitet i den nye løsningen. Kommunikasjon med forskjellige tredjeparter som tilbyr funksjonalitet til Min Side , blant annet:

        - Salgssystem
        - Kjernesystem (låneavtaler osv.)
        - Leverandør av elektronisk signering
        - Løsøreregisteret, via Altinns formidlingstjeneste (REST)

        Magne var i tillegg til integrasjonsarbeidet nevnt over også tungt involvert i utvikling og arkitektur av frontendapplikasjonen (React/TypeScript), og jobbet hele tiden tett sammen med kunden og UX-designer for å sikre at vi forstod problemene vi skulle løse.
        Min Side 2.0 er en modernisering av Brages kundeportal, hvor man kan logge inn og se låne- og leasingavtaler, fakturaer, signere dokumenter elektronisk osv. Prosjektet er en komplett omskriving av versjon 1 med et nytt og mer moderne brukergrensesnitt, i tillegg til en rekke ny funksjonalitet.
      `,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
