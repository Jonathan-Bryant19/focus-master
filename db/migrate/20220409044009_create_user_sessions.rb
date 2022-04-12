class CreateUserSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :user_sessions do |t|
      t.integer :user_id
      t.integer :focus_session_id
      t.integer :score

      t.timestamps
    end
  end
end
