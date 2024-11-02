import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  await prisma.setor
    .createMany({
      data: [
        { descricao: 'Comercial', abreviacao: 'Comercial' },
        { descricao: 'Backoffice', abreviacao: 'Backoffice' },
        { descricao: 'Planejamento', abreviacao: 'Planejamento' },
        { descricao: 'Operação', abreviacao: 'Operação' },
        { descricao: 'Financeiro', abreviacao: 'Financeiro' },
        { descricao: 'Jurídico', abreviacao: 'Jurídico' },
        { descricao: 'Jovem Aprendiz', abreviacao: 'Jovem Aprendiz' },
        { descricao: 'Recursos Humanos', abreviacao: 'RH' },
      ],
    })
    .catch(() => {
      console.log('Setores default ja existem');
    });

  await prisma.departamento
    .createMany({
      data: [
        { descricao: 'Comercial', abreviacao: 'Comercial' },
        { descricao: 'Backoffice', abreviacao: 'Backoffice' },
        { descricao: 'Planejamento', abreviacao: 'Planejamento' },
        { descricao: 'Operação', abreviacao: 'Operação' },
        { descricao: 'Financeiro', abreviacao: 'Financeiro' },
        { descricao: 'Jurídico', abreviacao: 'Jurídico' },
        { descricao: 'Jovem Aprendiz', abreviacao: 'Jovem Aprendiz' },
        { descricao: 'Recursos Humanos', abreviacao: 'RH' },
      ],
    })
    .catch(() => {
      console.log('departamento default ja existem');
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed concluida com sucesso');
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error('Seed error', e);

    process.exit(-1);
  });
