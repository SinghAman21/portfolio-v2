"use client";

import { useEffect, useRef } from "react";

const IDLE_SHEET = "/mascot/skeleton-idle.png";
const RUN_SHEET = "/mascot/skeleton-run.png";

const FRAME_COLUMNS = 6;
const DIRECTION_ROWS = 8;
const FRAME_WIDTH = 40;
const FRAME_HEIGHT = (FRAME_WIDTH * 222) / 226;
const START_X = 16;
const START_Y = 42;
const MIN_CURSOR_DISTANCE = 52;
const MASCOT_SPEED = 85; // Maximum chase speed in pixels per second.
const RUN_PIXELS_PER_FRAME = 7;
const IDLE_FPS = 8;

const INTERACTION_MESSAGES = [
  { path: "/resume", message: "going to see Aman's resume?" },
  { path: "/projects", message: "let's see what Aman has built!" },
  { path: "/experience", message: "checking out his experience?" },
  { path: "/blog", message: "looking for something to read?" },
  { path: "/opensource", message: "let's visit his open-source work!" },
  { path: "/products", message: "going product hunting?" },
  { path: "/about", message: "want to know more about Aman?" },
] as const;

const IDLE_MESSAGES = [
  "i personally love SilentParcel.",
  "did you check his GitHub? it's cool.",
  "Aman gives me no days off.",
  "i'm only skin and bones. mostly bones.",
  "this portfolio is my playground.",
  "he writes code; i chase cursors.",
  "i wonder what's on the blog today.",
] as const;

// Sprite row order: S, SE, E, NE, N, NW, W, SW.
const DIRECTION_ROW_BY_OCTANT = [2, 1, 0, 7, 6, 5, 4, 3] as const;

function getDirectionRow(deltaX: number, deltaY: number) {
  const angle = Math.atan2(deltaY, deltaX);
  const octant = (Math.round(angle / (Math.PI / 4)) + 8) % 8;
  return DIRECTION_ROW_BY_OCTANT[octant];
}

function getInteractionMessage(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;

  const href = target.closest("a[href]")?.getAttribute("href");
  if (!href) return null;

  return (
    INTERACTION_MESSAGES.find(
      ({ path }) => href === path || href.startsWith(`${path}/`),
    )?.message ?? null
  );
}

export default function CursorSkeleton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bubble = bubbleRef.current;
    const sprite = spriteRef.current;

    if (!container || !bubble || !sprite) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");

    if (reducedMotion.matches || coarsePointer.matches) return;

    const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: START_X, y: START_Y };
    let hasPointer = false;
    let directionRow = 0;
    let pendingDirectionRow = directionRow;
    let pendingDirectionSince = 0;
    let wasMoving = false;
    let runDistance = 0;
    let idleElapsed = 0;
    let lastFrameTime = performance.now();
    let lastPointerMovementTime = lastFrameTime;
    let boopUntil = 0;
    let hoveredInteractionMessage: string | null = null;
    let currentMessage = "";
    let currentSheet = "";
    let contentArea = document.querySelector<HTMLElement>("main .container");
    let currentFrame = -1;
    let currentRow = -1;
    let animationFrame = 0;

    const setMessage = (message: string) => {
      if (message === currentMessage) return;
      currentMessage = message;
      bubble.textContent = message;
    };

    const setSpriteFrame = (moving: boolean, frame: number, row: number) => {
      const sheet = moving ? RUN_SHEET : IDLE_SHEET;

      if (sheet !== currentSheet) {
        currentSheet = sheet;
        sprite.style.backgroundImage = `url("${sheet}")`;
      }

      if (frame === currentFrame && row === currentRow) return;
      currentFrame = frame;
      currentRow = row;
      sprite.style.backgroundPosition = `${-frame * FRAME_WIDTH}px ${-row * FRAME_HEIGHT}px`;
    };

    const handlePointerMove = (event: PointerEvent) => {
      cursor.x = event.clientX;
      cursor.y = event.clientY;
      lastPointerMovementTime = performance.now();
      hoveredInteractionMessage = getInteractionMessage(event.target);
      hasPointer = true;
    };

    const handlePointerDown = () => {
      boopUntil = performance.now() + 700;
      setMessage("boop!");
    };

    const handlePointerLeave = () => {
      hasPointer = false;
      setMessage("i'll wait here!");
    };

    const animate = (time: number) => {
      const elapsed = Math.min(time - lastFrameTime, 32);
      lastFrameTime = time;
      let destinationX = START_X;
      let destinationY = START_Y;

      const mascotCenterX = current.x + FRAME_WIDTH / 2;
      const mascotCenterY = current.y + FRAME_HEIGHT / 2;
      const cursorDeltaX = cursor.x - mascotCenterX;
      const cursorDeltaY = cursor.y - mascotCenterY;
      const cursorDistance = Math.max(Math.hypot(cursorDeltaX, cursorDeltaY), 0.001);

      if (hasPointer && cursorDistance > MIN_CURSOR_DISTANCE) {
        destinationX = cursor.x - (cursorDeltaX / cursorDistance) * MIN_CURSOR_DISTANCE - FRAME_WIDTH / 2;
        destinationY = cursor.y - (cursorDeltaY / cursorDistance) * MIN_CURSOR_DISTANCE - FRAME_HEIGHT / 2;
      } else if (hasPointer) {
        destinationX = current.x;
        destinationY = current.y;
      }

      destinationX = Math.min(Math.max(destinationX, 6), window.innerWidth - FRAME_WIDTH - 6);
      destinationY = Math.min(Math.max(destinationY, 34), window.innerHeight - FRAME_HEIGHT - 6);

      const travelX = destinationX - current.x;
      const travelY = destinationY - current.y;
      const travelDistance = Math.hypot(travelX, travelY);
      const moving = wasMoving ? travelDistance > 0.35 : travelDistance > 1.5;
      const travelStep = Math.min(travelDistance, (MASCOT_SPEED * elapsed) / 1000);

      if (moving) {
        const nextDirectionRow = getDirectionRow(travelX, travelY);

        if (!wasMoving) {
          directionRow = nextDirectionRow;
          pendingDirectionRow = nextDirectionRow;
          pendingDirectionSince = time;
        } else if (nextDirectionRow !== directionRow) {
          if (nextDirectionRow !== pendingDirectionRow) {
            pendingDirectionRow = nextDirectionRow;
            pendingDirectionSince = time;
          } else if (time - pendingDirectionSince > 70) {
            directionRow = nextDirectionRow;
          }
        } else {
          pendingDirectionRow = directionRow;
          pendingDirectionSince = time;
        }

        current.x += (travelX / travelDistance) * travelStep;
        current.y += (travelY / travelDistance) * travelStep;
      }
      container.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

      if (!contentArea?.isConnected) {
        contentArea = document.querySelector<HTMLElement>("main .container");
      }

      if (contentArea) {
        const contentBounds = contentArea.getBoundingClientRect();
        const bubbleWidth = bubble.offsetWidth;
        const bubbleHeight = bubble.offsetHeight;
        const visualLeft = Math.min(current.x, current.x + FRAME_WIDTH / 2 - bubbleWidth / 2);
        const visualRight = Math.max(
          current.x + FRAME_WIDTH,
          current.x + FRAME_WIDTH / 2 + bubbleWidth / 2,
        );
        const visualTop = current.y - bubbleHeight - 6;
        const visualBottom = current.y + FRAME_HEIGHT;
        const overlapsContent =
          visualRight > contentBounds.left &&
          visualLeft < contentBounds.right &&
          visualBottom > contentBounds.top &&
          visualTop < contentBounds.bottom;

        bubble.style.opacity = overlapsContent ? "0" : "1";
      } else {
        bubble.style.opacity = "1";
      }

      if (moving !== wasMoving) {
        runDistance = 0;
        idleElapsed = 0;
        currentFrame = -1;
        wasMoving = moving;
      }

      if (moving) {
        runDistance += travelStep;
      } else {
        idleElapsed += elapsed;
      }

      const frame = moving
        ? Math.floor(runDistance / RUN_PIXELS_PER_FRAME) % FRAME_COLUMNS
        : Math.floor(idleElapsed / (1000 / IDLE_FPS)) % FRAME_COLUMNS;
      setSpriteFrame(moving, frame, directionRow);

      if (time < boopUntil) {
        setMessage("boop!");
      } else if (!hasPointer) {
        const awayFromHome =
          Math.abs(current.x - START_X) > 2 || Math.abs(current.y - START_Y) > 2;
        setMessage(awayFromHome ? "heading home!" : "i'm Aman's bones.");
      } else if (moving || time - lastPointerMovementTime < 800) {
        const interactionMessage =
          hoveredInteractionMessage ??
          INTERACTION_MESSAGES[Math.floor(time / 6000) % INTERACTION_MESSAGES.length].message;
        setMessage(interactionMessage);
      } else {
        setMessage(IDLE_MESSAGES[Math.floor(time / 10000) % IDLE_MESSAGES.length]);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    setMessage("i'm Aman's bones.");
    setSpriteFrame(false, 0, directionRow);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        transform: `translate3d(${START_X}px, ${START_Y}px, 0)`,
      }}
    >
      <div
        ref={bubbleRef}
        className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-amber-200/80 bg-[#fffff0] px-2.5 py-1.5 font-mono text-[11px] leading-tight text-stone-700 shadow-md transition-opacity duration-150 after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-x-[4px] after:border-t-[5px] after:border-x-transparent after:border-t-amber-200/80 dark:border-stone-600 dark:bg-stone-900 dark:text-[#fffff0] dark:after:border-t-stone-600"
      >
        i'm Aman's bones.
      </div>
      <div
        ref={spriteRef}
        className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]"
        style={{
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          backgroundImage: `url("${IDLE_SHEET}")`,
          backgroundPosition: "0 0",
          backgroundRepeat: "no-repeat",
          backgroundSize: `${FRAME_WIDTH * FRAME_COLUMNS}px ${FRAME_HEIGHT * DIRECTION_ROWS}px`,
        }}
      />
    </div>
  );
}
