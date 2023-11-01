import React, { useRef, useEffect, useState } from "react";

interface FormInterface {
  email: string;
  password: string;
}

function FormComponent() {
  const [inputSelectedId, setInputSelectedId] = useState<string>("");
  const [formInputs, setFormInputs] = useState<FormInterface>({
    email: "",
    password: "",
  });
  const inputs = useRef<[HTMLInputElement | null, HTMLInputElement | null]>([null, null]);
  const emailLabelChar = "Email".split("");
  const passwordLabelChar = "Password".split("");
  const spanStyle = (index: number) => {
    return { transitionDelay: 50 * index + "ms" };
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputs.current &&
        inputs.current[0] &&
        inputs.current[1] &&
        !inputs.current[0].contains(event.target as Node) &&
        !inputs.current[1].contains(event.target as Node)
      ) {
        setInputSelectedId("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputSelectedId]);

  const handleSelectInput = (idInput: string) => {
    if (inputSelectedId !== idInput) {
      setInputSelectedId(idInput);
    }
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, email: event.target.value });
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, password: event.target.value });
  };

  return (
    <form id="Form">
      <h1>Identificate</h1>
      <div className="input-container">
        <label htmlFor="emailInput">
          {emailLabelChar.map((char, index) => (
            <span
              key={index}
              style={spanStyle(index)}
              className={`${
                (inputSelectedId === "emailInput" ||
                formInputs.email) &&
                "input-active"
              }`}
            >
              {char}
            </span>
          ))}
        </label>
        <input
          id="emailInput"
          name="email"
          placeholder=""
          ref={(el) => (inputs.current[0] = el)}
          onClick={() => handleSelectInput("emailInput")}
          onChange={handleChangeEmail}
        />
      </div>
      <div className="input-container">
        <label htmlFor="passwordInput">
          {passwordLabelChar.map((char, index) => (
            <span
              key={index}
              style={spanStyle(index)}
              className={`${
                (inputSelectedId === "passwordInput" ||
                formInputs.password) &&
                "input-active"
              }`}
            >
              {char}
            </span>
          ))}
        </label>
        <input
          id="passwordInput"
          name="password"
          placeholder=""
          ref={(el) => (inputs.current[1] = el)}
          onClick={() => handleSelectInput("passwordInput")}
          onChange={handleChangePassword}
        />
      </div>
      <button className="btn-submit">LOGIN</button>
      <p>
        Don't have an account?
        <a id="link-register" href="/registro">Register</a>
      </p>
    </form>
  );
}

export default FormComponent;