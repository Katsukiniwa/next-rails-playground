module Types
  class CommentType < Types::BaseObject
    field :id, Int, null: false
    field :question, QuestionType, null: false
    field :user, UserType, null: false
    field :content, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
