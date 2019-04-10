FactoryBot.define do
  factory :user do
    first_name { "MyString" }
    last_name { "MyString" }
    password { "pass" }
    email { "MyString@mail.com" }
    avatar { "MyString" }
    type { "" }
  end
end
