import React from 'react';
import { useRouter } from "next/router";

const Character = () => {
  const router = useRouter();
  const {id} = router.query;
}

export default Character;