import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Goals extends BaseSchema {
  protected tableName = 'goals'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('student_id').unsigned().references('id').inTable('students').onDelete('CASCADE')
      table.string('title', 255).notNullable()
      table.string('status', 255).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}