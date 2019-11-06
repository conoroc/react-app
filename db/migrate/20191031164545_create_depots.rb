class CreateDepots < ActiveRecord::Migration[5.2]
  def change
    create_table :depots do |t|

      t.timestamps
    end
  end
end
