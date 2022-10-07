import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./Signup";
import * as USER_HELPERS from "../utils/userToken";
import {
  Box,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Container,
  SimpleGrid,
} from '@chakra-ui/react';
import ImageBackground from '../images/imageBackground.png'

export default function LogIn({ authenticate }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      email,
      password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate("/");
    });
  }

  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        display="gridColumn"
        columns={{ md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack
         spacing={{ base: 10, md: 20 }} 
         h='561' w='400' 
         bgRepeat={'no-repeat'} 
         backgroundImage={`url(${ImageBackground})`}/>
        <Stack m={'60px'}>
          <Stack  spacing={4}>
            <Heading 
            lineHeight={1.1}
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
            Sign in
            <Text
            as={'span'}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text">!
            </Text>
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('gray.50', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <form onSubmit={handleFormSubmission}>
                <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    name="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="********"
                    value={password}
                    onChange={handleInputChange}
                    required
                    minLength="8"
                  />
                  {error && (
                  <Stack className="error-block">
                    <Text>There was an error submiting the form:</Text>
                    <Text>{error.message}</Text>
                  </Stack>
                  )}

                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column',}}
                    align={'start'}
                    justify={'space-around'}>
                    <Checkbox colorScheme='red' isRequired>Remember me</Checkbox>
                  </Stack>
                  <Button
                    type="submit"
                    size="lg"
                    bg={'#ff5e5b'}
                    color={'white'}
                    _hover={{ bg: '#ff423d' }}>
                    Sign in
                  </Button>
                </Stack>
              {/*{error && (
                <div className="error-block">
                  <p>There was an error submiting the form:</p>
                  <p>{error.message}</p>
                </div>
              )}*/}
              </form>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
