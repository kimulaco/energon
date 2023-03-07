import { useState, useCallback } from 'react';
import type { FC, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input } from '@mui/joy';
import { AppPageTitle } from '../../components/AppPageTitle';
import { useUser } from '../../utils/user/useUser';
import { logger } from '../../utils/logger/';

interface FormValue {
  id: string;
  password: string;
}

const PageLogin: FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formValue, setFormValue] = useState<FormValue>({
    id: '',
    password: '',
  });

  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      if (!name || !(name in formValue)) return;

      setFormValue({ ...formValue, [name]: value });
    },
    [formValue],
  );

  const handleSubmitForm = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = await login(formValue.id, formValue.password);
      logger.log(data);

      navigate('/', { replace: true });
    },
    [formValue],
  );

  return (
    <Box>
      <Box
        sx={{
          maxWidth: '300px',
          mt: 8,
          mx: 'auto',
          p: 4,
        }}
      >
        <form onSubmit={handleSubmitForm}>
          <AppPageTitle>Login</AppPageTitle>

          <FormControl sx={{ mt: 2 }}>
            <FormLabel>ID</FormLabel>
            <Input
              type="text"
              name="id"
              required
              value={formValue.id}
              onChange={handleChangeInput}
            />
          </FormControl>

          <FormControl sx={{ mt: 2 }}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              autoComplete="off"
              required
              value={formValue.password}
              onChange={handleChangeInput}
            />
          </FormControl>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" sx={{ minWidth: '120px' }}>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default PageLogin;
