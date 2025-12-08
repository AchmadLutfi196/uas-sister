/* eslint-disable prettier/prettier */
import {
    // SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway()
  export class MaintenanceGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    private connectedClients = new Map<string, string>(); // userId -> socketId
  
    handleConnection(client: Socket) {
      const userId = client.handshake.query.userId as string; // Kirim userId dari frontend
      if (userId) {
        this.connectedClients.set(userId, client.id);
      }
    }
  
    handleDisconnect(client: Socket) {
      const userId = Array.from(this.connectedClients.entries()).find(
        ([, socketId]) => socketId === client.id,
      )?.[0];
      if (userId) {
        this.connectedClients.delete(userId);
      }
    }
  
    // Broadcast ke semua user kecuali admin
    notifyMaintenance(users: Array<{ id: number; role: string }>) {
      users.forEach((user) => {
        if (user.role !== 'ADMIN') {
          const socketId = this.connectedClients.get(user.id.toString());
          if (socketId) {
            this.server.to(socketId).emit('maintenance', { message: 'Server is under maintenance' });
          }
        }
      });
    }
  }
  