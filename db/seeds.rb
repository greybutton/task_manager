# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

admin = Admin.find_or_create_by(first_name: 'admin', last_name: 'admin', email: 'admin@localhost.com')
admin.password = 'admin'
admin.save

30.times do |i|
  u = Manager.find_or_create_by(first_name: "FN#{i}", last_name: "LN#{i}", email: "email#{i}@mail.gen")
  u.password = "#{i}"
  u.save
end

30.times do |i|
  u = Developer.find_or_create_by(first_name: "FN#{i}", last_name: "LN#{i}", email: "email#{i}@mail.gen")
  u.password = "#{i}"
  u.save
end
