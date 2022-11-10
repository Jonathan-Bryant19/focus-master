# User.all.destroy_all
# UserSession.all.destroy_all
# FocusSession.all.destroy_all

puts "Seeding Users..."
User.create(username: "Orion", email: "orion@adventure.com", password: "1919", password_confirmation: "1919")
User.create(username: "Desiree", email: "desi@mywife.com", password: "1234", password_confirmation: "1234")
User.create(username: "Hunter", email: "hunter@myson.com", password: "1234", password_confirmation: "1234")
User.create(username: "Logan", email: "logan@myson.com", password: "1234", password_confirmation: "1234")
User.create(username: "Jonathan", email: "jonathan@me.com", password: "1234", password_confirmation: "1234")

puts "Seeding FocusSessions..."
FocusSession.create(duration: 10, interval: 2)
FocusSession.create(duration: 900, interval: 2)
FocusSession.create(duration: 900, interval: 300)
FocusSession.create(duration: 1800, interval: 2)
FocusSession.create(duration: 1800, interval: 300)
FocusSession.create(duration: 1800, interval: 600)
FocusSession.create(duration: 1800, interval: 900)
FocusSession.create(duration: 3600, interval: 2)
FocusSession.create(duration: 3600, interval: 300)
FocusSession.create(duration: 3600, interval: 600)
FocusSession.create(duration: 3600, interval: 900)

puts "Seeding UserSessions..."
100.times {
    UserSession.create(
        user_id: User.all.sample.id,
        focus_session_id: FocusSession.all.sample.id,
        score: rand(20..100)
    )
}
