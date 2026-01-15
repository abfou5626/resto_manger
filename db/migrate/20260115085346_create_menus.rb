class CreateMenus < ActiveRecord::Migration[8.1]
  def change
    create_table :menus do |t|
      t.string :name
      t.text :description
      t.decimal :price, precision: 10, scale: 2
      t.string :category
      t.boolean :available

      t.timestamps
    end
  end
end
