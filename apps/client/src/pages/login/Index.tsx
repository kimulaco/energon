import { useState, useCallback } from "react";
import type { FC, ChangeEvent, FormEvent } from "react";

interface FormValue {
  id: string;
  password: string;
}

const requestLogin = async (value: FormValue) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  const token = import.meta.env.VITE_X_ENERGON_API_TOKEN || "";

  try {
    const response = await fetch(`${baseUrl}/api/user/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-ENERGON-API-TOKEN": token,
      },
      body: JSON.stringify({
        id: value.id,
        password: value.password,
      }),
    });
    if (!response.ok) {
      if (!response.body) {
        throw null;
      }
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const PageLogin: FC = () => {
  const [formValue, setFormValue] = useState<FormValue>({
    id: "",
    password: "",
  });

  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;

      if (!id || !(id in formValue)) return;

      setFormValue({ ...formValue, [id]: value });
    },
    [formValue]
  );

  const handleSubmitForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      requestLogin(formValue);
    },
    [formValue]
  );

  return (
    <div className="PageLogin">
      <form onSubmit={handleSubmitForm}>
        <div>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            required
            value={formValue.id}
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={formValue.password}
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default PageLogin;
