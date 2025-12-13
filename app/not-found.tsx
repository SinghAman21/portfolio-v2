'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Anchor from "@/components/Anchor"
import Header from "@/components/Header"
import { GeistMono } from 'geist/font/mono'
import { cn } from '@/lib/utils'

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type Position = { x: number; y: number }

const GRID_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const INITIAL_DIRECTION: Direction = 'RIGHT'
const INITIAL_SPEED = 150
const MIN_SPEED = 300
const SPEED_DECREASE = 20

export default function NotFound() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(INITIAL_FOOD)
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [speed, setSpeed] = useState(INITIAL_SPEED)
  const [wallHits, setWallHits] = useState(0)
  const wallHitRef = useRef(false)

  const generateFood = useCallback((): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
    return newFood
  }, [])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection(INITIAL_DIRECTION)
    setGameOver(false)
    setScore(0)
    setGameStarted(false)
    setSpeed(INITIAL_SPEED)
    setWallHits(0)
  }

  const startGame = () => {
    setGameStarted(true)
  }

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted) return

    // Reset wall hit flag at start of each move
    wallHitRef.current = false

    setSnake(currentSnake => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      switch (direction) {
        case 'UP':
          head.y -= 1
          break
        case 'DOWN':
          head.y += 1
          break
        case 'LEFT':
          head.x -= 1
          break
        case 'RIGHT':
          head.x += 1
          break
      }

      
      let hitWall = false
      if (head.x < 0) {
        head.x = GRID_SIZE - 1
        hitWall = true
      } else if (head.x >= GRID_SIZE) {
        head.x = 0
        hitWall = true
      }
      
      if (head.y < 0) {
        head.y = GRID_SIZE - 1
        hitWall = true
      } else if (head.y >= GRID_SIZE) {
        head.y = 0
        hitWall = true
      }

      if (hitWall && !wallHitRef.current) {
        wallHitRef.current = true
        setWallHits(prev => prev + 1)
        setSpeed(prev => Math.min(MIN_SPEED, prev + SPEED_DECREASE))
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10)
        setFood(generateFood())
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameOver, gameStarted, generateFood])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted && e.key === ' ') {
        startGame()
        return
      }

      if (gameOver && e.key === ' ') {
        resetGame()
        return
      }

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          if (direction !== 'DOWN') setDirection('UP')
          break
        case 'ArrowDown':
          e.preventDefault()
          if (direction !== 'UP') setDirection('DOWN')
          break
        case 'ArrowLeft':
          e.preventDefault()
          if (direction !== 'RIGHT') setDirection('LEFT')
          break
        case 'ArrowRight':
          e.preventDefault()
          if (direction !== 'LEFT') setDirection('RIGHT')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, gameOver, gameStarted])

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, speed)
    return () => clearInterval(gameInterval)
  }, [moveSnake, speed])

  const renderCell = (x: number, y: number) => {
    const isSnake = snake.some(segment => segment.x === x && segment.y === y)
    const isHead = snake[0]?.x === x && snake[0]?.y === y
    const isFood = food.x === x && food.y === y

    let cellClass = "w-4 h-4 border border-neutral-700"
    
    if (isFood) {
      cellClass += " bg-red-500"
    } else if (isHead) {
      cellClass += " bg-neutral-200"
    } else if (isSnake) {
      cellClass += " bg-neutral-400"
    } else {
      cellClass += " bg-neutral-900"
    }

    return (
      <div
        key={`${x}-${y}`}
        className={cellClass}
      />
    )
  }

  return (
    // <main className="mb-32 text-neutral-400 max-w-2xl mx-auto ">
    <main className={cn(
        GeistMono.className,
        'text-[13px] [text-rendering:geometricPrecision] container'
      )}>
      <Header 
        name="Aman Singh" 
        location="Kolkata, India." 
      />

      <section className="mt-6">
        <h2 className="text-gray-900 dark:text-neutral-100">404 - Page Not Found</h2>
        <p className="mt-2 text-gray-600 dark:text-neutral-400">
          You&apos;ve in the dark for way too long. It&apos;s time to get out of the dark and find your way back to the home page. But while you&apos;re here, you can play a game of Nokia Snake.
        </p>
      </section>

      <section className="mt-8">
        <div className="bg-neutral-800 p-6 rounded-lg border border-neutral-700">
          {/* Game Stats */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-neutral-200 font-mono text-sm">
              <div>Score: {score}</div>
              <div className="text-neutral-400 text-xs">Wall Hits: {wallHits}</div>
            </div>
            <div className="text-neutral-500 font-mono text-sm text-right">
              <div>Nokia Snake</div>
              <div className="text-neutral-400 text-xs">Speed: {Math.round(1000/speed)} fps</div>
            </div>
          </div>

          {/* Game Board */}
          <div className="flex justify-center mb-4">
            <div 
              className="grid gap-0 bg-neutral-900 p-2 border-2 border-neutral-600 rounded"
              style={{ 
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                width: 'fit-content'
              }}
            >
              {Array.from({ length: GRID_SIZE }, (_, y) =>
                Array.from({ length: GRID_SIZE }, (_, x) => renderCell(x, y))
              )}
            </div>
          </div>

          {/* Game Controls & Status */}
          <div className="text-center space-y-2">
            {!gameStarted && !gameOver && (
              <div className="space-y-2">
                <p className="text-neutral-300">Press SPACE to start</p>
                <p className="text-neutral-500 text-sm">Use arrow keys to control the snake</p>
              </div>
            )}
            
            {gameOver && (
              <div className="space-y-2">
                <p className="text-red-400 font-medium">Game Over!</p>
                <p className="text-neutral-300">Final Score: {score}</p>
                <p className="text-neutral-500 text-sm">Press SPACE to play again</p>
              </div>
            )}

            {gameStarted && !gameOver && (
              <p className="text-neutral-500 text-sm">
                Use arrow keys to move • Eat the red food • Hit walls to teleport (but get slower) • Don&apos;t hit yourself
              </p>
            )}
          </div>

          {/* Controls for mobile */}
          <div className="mt-4 grid grid-cols-3 gap-2 max-w-48 mx-auto md:hidden">
            <div></div>
            <button 
              onClick={() => direction !== 'DOWN' && setDirection('UP')}
              className="bg-neutral-700 hover:bg-neutral-600 text-neutral-200 p-2 rounded text-sm"
            >
              ↑
            </button>
            <div></div>
            <button 
              onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
              className="bg-neutral-700 hover:bg-neutral-600 text-neutral-200 p-2 rounded text-sm"
            >
              ←
            </button>
            <button 
              onClick={() => !gameStarted ? startGame() : gameOver ? resetGame() : null}
              className="bg-neutral-600 hover:bg-neutral-500 text-neutral-200 p-2 rounded text-xs"
            >
              {!gameStarted ? 'START' : gameOver ? 'RESET' : 'PAUSE'}
            </button>
            <button 
              onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
              className="bg-neutral-700 hover:bg-neutral-600 text-neutral-200 p-2 rounded text-sm"
            >
              →
            </button>
            <div></div>
            <button 
              onClick={() => direction !== 'UP' && setDirection('DOWN')}
              className="bg-neutral-700 hover:bg-neutral-600 text-neutral-200 p-2 rounded text-sm"
            >
              ↓
            </button>
            <div></div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <p className="text-gray-600 dark:text-neutral-400">
          When you&apos;re done playing, you can return to the{" "}
          <Anchor href="/">home page</Anchor>
          {" "}or explore other sections of my site.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-gray-900 dark:text-neutral-100">quick links</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="whitespace-nowrap">
            <span>explore </span>
            <Anchor href="/projects">work</Anchor>
            <span className="mx-1 text-neutral-400/50">·</span>
            <Anchor href="/experience">experience</Anchor>
            <span className="mx-1 text-neutral-400/50">·</span>
            <Anchor href="/blog">writing</Anchor>
          </span>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-gray-900 dark:text-neutral-100">reach</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="whitespace-nowrap">
            <span>connect on </span>
            <Anchor href="https://x.com/useraman21" target="_blank">
              {'𝕏'}
            </Anchor>
            <span className="mx-1 text-neutral-400/50">·</span>
            <Anchor href="https://github.com/SinghAman21" target="_blank">
              GitHub
            </Anchor>
            <span className="mx-1 text-neutral-400/50">·</span>
            <Anchor href="https://www.linkedin.com/in/Aman-Singh-8ab9911bb/" target="_blank">
              LinkedIn
            </Anchor>
            <span className="mx-1 text-neutral-400/50">·</span>
            <Anchor href="https://peerlist.io/AmanSingh/" target="_blank">
              Peerlist
            </Anchor>
          </span>
          <span>
            — or send me an email at{" "}
            <Anchor href="mailto:useraman21@gmail.com" target="_blank">
              useraman21@gmail.com
            </Anchor>
          </span>
        </div>
      </section>
    </main>
  )
}

