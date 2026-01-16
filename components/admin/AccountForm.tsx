"use client";

import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AccountFormProps {
  onClose: () => void;
}

export function AccountForm({ onClose }: AccountFormProps) {
  const { user, updateUser, loadCurrentUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar senha se foi preenchida
    if (password) {
      if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres');
        return;
      }
      if (password !== confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }
    }

    setIsLoading(true);

    try {
      // Validar campos obrigatórios
      if (!name.trim() || !email.trim()) {
        setError('Nome e email são obrigatórios');
        setIsLoading(false);
        return;
      }

      const updates: { name: string; email: string; password?: string } = {
        name: name.trim(),
        email: email.trim(),
      };

      if (password && password.trim() !== '') {
        updates.password = password;
      }

      console.log("🔍 [AccountForm] Enviando atualização:", { ...updates, password: updates.password ? '***' : undefined });

      const result = await updateUser(updates);

      if (result.success) {
        // Recarregar dados do usuário para garantir sincronização
        await loadCurrentUser();
        // Limpar senhas
        setPassword('');
        setConfirmPassword('');
        // Fechar modal
        onClose();
        // Mostrar mensagem de sucesso
        alert('Dados atualizados com sucesso!');
      } else {
        setError(result.error || 'Erro ao atualizar dados');
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Erro ao atualizar dados');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Editar Conta
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-styled"
              placeholder="Seu nome"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-styled"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Nova Senha (opcional)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-styled pr-12"
                placeholder="Deixe em branco para não alterar"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Preencha apenas se desejar alterar a senha
            </p>
          </div>

          {password && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirmar Nova Senha
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-styled"
                placeholder="Confirme a nova senha"
              />
            </div>
          )}

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 btn-primary-gradient disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
