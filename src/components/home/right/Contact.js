export default function Contact({user}) {
  return (
    <div className="contact hover3">
        <div className="contact_img"> 
            <img src={user.picture} alt="" />
        </div>
        <span> {user.first_name} {user.lastname} </span>
    </div>
  )
}
