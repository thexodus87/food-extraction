import { useEffect, useState } from "react";
import useHttp from "../hooks/useHTTP";
// import { useEffect } from "react";
// import { useState } from "react";
import MealItem from "./MealItem";
import Error from "./UI/Error";

const requestConfig = {};

const BASE_URL = 'http://localhost:3000/meals';
export default function Meals() {
    const { data: loadedMeals, isLoading, error } = useHttp(`${BASE_URL}`,requestConfig, []);
    
    if(isLoading){
        return<p>Geliyor</p>
    }
    if(error){
       return <Error title='fatih:'
       message={error} />
    }
    // const [loadedMeals, setLoadedMeals] = useState([]);
    // useEffect(() => {
    //     async function fetchMeals() {
    //     const response = await fetch(`${BASE_URL}`);
    //     if(!response.ok){
    //         throw new Error('yemekler gelmedi')
    //     }
    //     const meals = await response.json();
    //     setLoadedMeals(meals);
    //     }
    //     fetchMeals();
    // },[])
   // animasyonlu spinner ekle
    //https://stackoverflow.com/questions/39426083/update-react-component-every-second

    return <ul id="meals">
        {loadedMeals.map(meal =>
            <MealItem key={meal.id} meal={meal} />)}
    </ul>
    
}

