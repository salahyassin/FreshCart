import { Card, Skeleton } from '@heroui/react'
import React from 'react'

export default function LoadingScreen() {
  return (
    <div className="grid grid-cols-5 gap-3">  
      {Array(10).fill(0).map((_, index) => (
        <Card key={index} className="w-full space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-80 rounded-lg bg-default-300" />
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        </Card>
      ))}
    </div>
  )
}