import {prisma} from "./prisma-client";

async function emptyDb() {
  await prisma.project.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();
  await prisma.team.deleteMany();
}

async function main() {
  await emptyDb();

  const magneTeam = await prisma.team.create({
    data: {
      id: "3368836c-c725-401b-9e5d-0cc99a254551",
      name: "Magne Skutle Personal Team",
      isPersonal: true,
    },
  });
  const magne = await prisma.user.create({
    data: {
      id: "117310930967543272705",
      email: "magne.skutle@gmail.com",
      firstName: "Magne",
      lastName: "Skutle",
      teams: {
        connect: {id: magneTeam.id},
      },
      photoUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocJS139lS3Gb82XcGxqV3jSbz2cKQNFaooT83xQLrRUhg5Q=s96-c",
    },
  });

  const brage = await prisma.client.create({
    data: {
      id: "3968836c-c725-401b-9e5d-0cc99a254551",
      teamId: magneTeam.id,
      name: "Brage Finans",
    },
  });

  const greenstation = await prisma.client.create({
    data: {
      id: "4968836c-c725-401b-9e5d-0cc99a254551",
      teamId: magneTeam.id,
      name: "Greenstat",
    },
  });

  await prisma.project.create({
    data: {
      id: "5968836c-c725-401b-9e5d-0cc99a254551",
      name: "Greenstation",
      startedAt: "2021-03-01T00:00:00Z",
      endedAt: "2021-08-31T00:00:00Z",
      clientId: greenstation.id,
      teamId: magneTeam.id,
      description: `
      Samarbeidet med kollega om arkitektur for hele ladesystemet. Jevnlige møter med kunde og leverandører av tredjepartssystemer. Deltakelse i alle faser av prosjektet - fra systemarkitektur og backend-programmering, til utvikling av iOS- og Android-app i React Native og medfølgende webgrensesnitt (React SPA) for administrasjon av systemet.
      Greenstation er en ny og brukervennlig ladestasjon for elbiler. Magne bistod kunden med arkitektur og systemutvikling frem til lansering av pilotstasjon i august 2021.

      Hos Greenstation står brukeropplevelsen i fokus, og hele ladeprosessen er vesentlig forenklet og automatisert. Noen stikkord er
      - Automatisk skiltgjenkjenning
      - Velkomstskjerm som veileder deg til riktig ladepunkt for din bil
      - Skjerm ved ladepunkt som veileder deg gjennom hele ladeprosessen - Betal med kort! Du trenger ikke laste ned en egen app.
      - Egen (valgfri) app som forenkler prosessen ytterligere.

      Ladestasjonen har fått mye positiv medieomtale, blant annet hos TV2 og Teknisk Ukeblad.

      https://www.tv2.no/broom/slik-skal-de-gjore-elbil-lading-mye-enklere/14270592/
      https://www.tu.no/video/slik-tenker-greenstation-nytt-om-elbillading/1755/`,
    },
  });

  await prisma.project.create({
    data: {
      id: "3968836c-c725-401b-9e5d-0cc99a254552",
      name: "Min Side 2.0",
      clientId: brage.id,
      teamId: magneTeam.id,
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
