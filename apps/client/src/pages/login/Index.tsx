import { useState, useCallback } from "react";
import type { FC, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/user/useUser";
import { logger } from "../../utils/logger/";
import { UserInfo } from "../../interfaces/user";

interface FormValue {
  id: string;
  password: string;
}

const PageLogin: FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();
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
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = await login(formValue.id, formValue.password);
      logger.log(data);

      navigate("/", { replace: true });
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
