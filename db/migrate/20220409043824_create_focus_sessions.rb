class CreateFocusSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :focus_sessions do |t|
      t.integer :duration
      t.integer :interval

      t.timestamps
    end
  end
end
