FactoryBot.define do
  sequence :string do |n|
    "string#{n}"
  end

  sequence :first_name do |n|
    "First name #{n}"
  end

  sequence :last_name do |n|
    "Last name #{n}"
  end

  sequence :email do |n|
    "email#{n}@factory.com"
  end

  sequence :password do |n|
    "pass #{n}"
  end

  sequence :name do |n|
    "name #{n}"
  end

  sequence :description do |n|
    "description #{n}"
  end

  sequence :task_state do |n|
    [:new_task, :in_development, :in_qa, :in_code_review, :ready_for_release, :released, :archived].sample
  end
end
