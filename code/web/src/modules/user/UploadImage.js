// update this idea from user "uploading" an image from local
// to user being able to provide an image url from an online source to display
// we can save the string and pass it into the src for the img tag to display 
// this component can be changed to a dynamic form component that is able 
// to take in a specific input/label combination to update address/email/image
// not sure if bio will work since that will be a text area rather than an input

import React, { Fragment, setState } from 'react'
import axios from 'axios'

const UploadImage = () => {
  // const [imagePath, setImagePath] = useState('')
  // const [imageName, setImageName] = useState('Choose image file')
  // const [uploadedImage, setUploadedImage] = useState({})
  // const [message, setMessage] = useState("")

  // const updateImage = (e) => {
  //   setImageName(e.target.files[0])
  //   setImagePath(e.target.files[0].names)
  // }

  const submitImage = async () => {
    e.prevent.default()
    // refactor this formData append
    const formData = new FormData();
    formData.append('imagePath', imagePath)

    try {
      // import routeApi
      const response = await axios.post(routeApi, mutation({
        // do we need to mutate or can we 
        // re-set user with an action
        // what is the mutation end point for this

        // operation: 'userLogin',
        // variables: userCredentials,
        // fields: ['user {name, email, role}', 'token']
      }))
      const { imageName, imagePath } = response.data;
      setUploadedImage({ imageName, imagePath })
      setMessage("Image uploaded")
    } catch(err) {
      setMessage("Error uploading image")
      console.log(err)
    }
  }

  return (
    <>
      {message && alert(message)}
      <form onSubmit={submitImage}>
        <section>
          <input type="file" className="image-input" id="image-input" onChange={updateImage} />
          <label className="image-input-label" htmlFor="image-input">{imageName}</label>
          {/* // submit btn  */}
        </section>
      </form>
      { uploadedImage && <section><img src={uploadedImage.imagePath} alt={uploadedImage.imageName}/></section>}
    </>
  )
}

export default UploadImage