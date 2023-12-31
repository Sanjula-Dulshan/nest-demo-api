import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 0, name: 'John', age: 20, role: 'student' },
    { id: 1, name: 'Jane', age: 24, role: 'student' },
    { id: 2, name: 'Dave', age: 30, role: 'lecturer' },
    { id: 3, name: 'Kate', age: 27, role: 'student' },
    { id: 4, name: 'Mike', age: 25, role: 'student' },
  ];
  createUser(createUserDto: CreateUserDto): User {
    const newUser = { ...createUserDto, id: this.users.length };

    this.users.push(newUser);
    return newUser;
  }

  getUsers(role?: 'student' | 'lecturer'): User[] {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  getUser(id: number): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): User {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.getUser(id);
  }

  removeUser(id: number): User {
    const toBeRemoved = this.getUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return toBeRemoved;
  }
}
