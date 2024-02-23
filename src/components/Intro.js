import React from "react";

// rrd imports
import { Form, useActionData } from "react-router-dom";

// library
import { UserPlusIcon } from "@heroicons/react/24/solid";

// asset
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  const errors = useActionData();

  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret of financial freedom. Start your
          journey today.
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            placeholder="What is your name?"
            aria-label="Your name"
            autoComplete="given-name"
          />
          {errors?.userName && (
            <span className="text-danger">{errors.userName}</span>
          )}
          <input type="hidden" name="_action" value="createUser" />
          <button className="btn btn--dark" type="submit">
            <span>Creat user</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} alt="User with money" width={600} />
    </div>
  );
};

export default Intro;
