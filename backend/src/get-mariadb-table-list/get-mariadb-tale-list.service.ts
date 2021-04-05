import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';

@Injectable()
export class GetMariadbTaleListService {
  getTableList() {
    const entityManager = getManager();
    const sql = entityManager.query(
      `
          select
            table_schema,
            table_name
          from
            information_schema.tables
          where
            table_type = 'BASE TABLE'
            and table_schema not in ('information_schema','mysql', 'performance_schema','sys')
          order by
            table_schema,
            table_name;
        `,
      [],
    );

    sql.then((r) => {
      console.info('Sql:', r);
    });
    return 'sql';
  }
}
