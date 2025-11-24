"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { gameContext } from "@/store/gameContext";
import { multipliers } from "@/constants/gameConfig";
import Ball from "@/lib/Ball";
import { obstaclesPosition } from "@/lib/Obstacles";
import { sinksPosition } from "@/lib/Sink";
import { draw } from "@/lib/Draw";
import { BallManager } from "@/lib/BallManager";
import { Simulator } from "@/lib/Simulator";

export default function Draw() {
  const canvasRef = useRef();
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(600);

  // shared state
  const { rows, setRows } = useContext(gameContext);
  const { betFn, setBeFn } = useContext(gameContext);
  const { multiplierContainerRef } = useContext(gameContext);

  const obstaclesRef = useRef([]);
  const sinksRef = useRef([]);
  const multipliersArayRef = useRef(multipliers[rows]);

  const collisionCallback = ({ multiplier }) => {
    if (multiplierContainerRef && multiplierContainerRef.current) {
      console.log(multiplierContainerRef.current);
      const div = document.createElement("div");
      div.className = "multiplier-item";
      div.innerText = `${multiplier}x`;
      multiplierContainerRef.current.append(div);
      while (multiplierContainerRef.current.children.length > 10) {
        multiplierContainerRef.current.removeChild(
          multiplierContainerRef.current.firstChild
        );
      }
    } else {
      console.warn("multiplierContainerRef is not available.");
    }
  };

  useEffect(() => {
    BallManager.setCanvasWidth(canvasWidth);
    BallManager.setCanvasHeight(canvasHeight);
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    BallManager.setRows(rows);
    BallManager.updateRadius();
  }, [rows]);

  useEffect(() => {
    setBeFn(() => BallManager.addBall.bind(BallManager));
  }, []);

  useEffect(() => {
    // calcuate obstacle position according to number of rows
    const obstacles = obstaclesPosition(rows, canvasWidth, canvasHeight);
    obstaclesRef.current = obstacles;

    // calcuate sink position according to number of rows
    const sinks = sinksPosition(rows, canvasWidth, canvasHeight);
    sinksRef.current = sinks;

    // change multiplier according to nnumber of rows
    multipliersArayRef.current = multipliers[rows];
  }, [rows, canvasHeight, canvasWidth]);

  useEffect(() => {
    const simulator = new Simulator(
      BallManager,
      canvasWidth,
      canvasHeight,
      rows
    );
    simulator.setUpTestDom();
    // setTimeout(() => {
    //   simulator.simulate();
    // }, 1000);
  }, [canvasWidth, canvasHeight, rows]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setCanvasHeight(400);
        setCanvasWidth(400);
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, []);
  useEffect(() => {
    let animationFrameId;
    const ctx = canvasRef.current.getContext("2d");

    const render = () => {
      draw(
        ctx,
        canvasWidth,
        canvasHeight,
        obstaclesRef.current,
        sinksRef.current,
        BallManager,
        multipliersArayRef.current,
        collisionCallback
      );
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      height={canvasHeight}
      width={canvasWidth}
      onClick={() => {
        addBall();
      }}
    ></canvas>
  );
}
