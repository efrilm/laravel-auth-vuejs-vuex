<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\V1\Auth\LoginRequest;
use App\Http\Requests\API\V1\Auth\RegsiterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegsiterRequest $request)
    {
        try {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password,
            ]);

            return response()->json([
                'message' => 'User Registered Successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(
                [
                    'error' => 'Unable to save the user record, please refresh webpage and try again',
                ],
                401
            );
        }
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'errors' => 'The Provided credentials are incorrect',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
        ], 200);
    }

    public function checkUSerStatus()
    {
        $status = auth()->check() ? true : false;
        return response()->json(['status' => $status]);
    }
}
