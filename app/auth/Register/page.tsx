'use client';

const Register = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const re = formData.get('reEnter') as string;
    // Do something with the form data, e.g., send it to an API, store it in state, etc.
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    if (re !== password) {
      alert("Passwords need to match");
      return;
    }

    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });

    if (res.ok) {
      console.log(res.json());
      return;
    }

    console.log("Form wasn't submitted Successfull");
    return;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' name='name' required />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' name='email' required />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' name='password' required />
      </div>
      <div>
        <label htmlFor='reEnter'>Re-Enter Password:</label>
        <input type='password' id='reEnter' name='reEnter' required />
      </div>
      <div>
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
};

export default Register;
