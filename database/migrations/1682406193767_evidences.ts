import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Evidence extends BaseSchema {
  protected tableName = 'evidence'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('goal_id').unsigned().references('id').inTable('goals').onDelete('CASCADE')
      table.string('date', 255).notNullable()
      table.string('comment', 255).notNullable()
      table.string('staff_member', 255).notNullable()
      table.string('image_link', 255)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
