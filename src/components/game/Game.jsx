"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { gameContext } from "@/store/gameContext";
import { colorArray, multipliers } from "@/constants/gameConfig";
import Ball from "@/lib/Ball";
import { drawObstacle, obstaclesPosition } from "@/lib/Obstacles";
import { drawSink, sinksPosition } from "@/lib/Sink";
import { writeText } from "@/lib/Text";
import { getMirroredColors } from "@/lib/MirroredColor";
import { draw } from "@/lib/Draw";

export default function Draw() {
  const canvasRef = useRef();
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(600);

  // shared state
  const { rows, setRows } = useContext(gameContext);
  const { betFn, setBeFn } = useContext(gameContext);

  const obstaclesRef = useRef([]);
  const sinksRef = useRef([]);
  const ballsRef = useRef([]);
  const multipliersArayRef = useRef(multipliers[16]);

  const addBall = useCallback(() => {
    const radius = 6;
    const offset = -40 + Math.random() * 80;
    const x = canvasWidth / 2 + offset;
    const y = 30;
    const color = "red";
    const ball = new Ball(x, y, radius, color);
    ballsRef.current.push(ball);
  }, [canvasWidth]);

  useEffect(() => {
    setBeFn(() => addBall);
  }, []);

  useEffect(() => {
    const obstacles = obstaclesPosition(rows, canvasWidth, canvasHeight);
    obstaclesRef.current = obstacles;

    const sinks = sinksPosition(rows, canvasWidth, canvasHeight);
    sinksRef.current = sinks;

    // change multiplier according to nnumber of rows
    multipliersArayRef.current = multipliers[rows];
  }, [rows, canvasHeight, canvasWidth]);

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
        ballsRef.current,
        multipliersArayRef.current
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
