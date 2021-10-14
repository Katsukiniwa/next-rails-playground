class CreateReplyToAnaswers < ActiveRecord::Migration[6.1]
  def change
    create_table :reply_to_anaswers do |t|
      t.references :question, null: false, foreign_key: true
      t.references :answer, null: false, foreign_key: true

      t.timestamps
    end
  end
end