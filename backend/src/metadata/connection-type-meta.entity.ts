import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('connection_type_meta')
export class ConnectionTypeMetaEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'connection_type' })
  connectionType: string;

  @Column({ name: 'connection_list_tables' })
  connectionListTables: string;

  @Column({ name: 'connection_list_columns' })
  connectionListColumns: string;
}
