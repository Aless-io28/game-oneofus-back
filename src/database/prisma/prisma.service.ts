import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@generated/prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private pool: Pool;

  constructor() {
    if (!process.env['DB_URL']) {
      throw new Error(
        'DB_URL is not defined. Check your environment variables.',
      );
    }

    const pool = new Pool({
      connectionString: process.env['DB_URL'],
      connectionTimeoutMillis: 5000,
    });

    const adapter = new PrismaPg(pool);

    super({ adapter });

    this.pool = pool;
  }

  // Verificar la conexión a la base de datos al iniciar el módulo
  async onModuleInit() {
    try {
      await this.$connect();
      await this.pool.query('SELECT 1');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown database connection error';

      throw new Error(`Failed to connect to database: ${message}`);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
