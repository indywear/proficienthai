-- Function to increment points and handle level up
create or replace function increment_points(p_user_id_line text, p_points int)
returns void as $$
declare
  v_user_id uuid;
  v_current_points int;
  v_current_level text;
  v_new_points int;
begin
  select id, points, level into v_user_id, v_current_points, v_current_level from public.users where line_id = p_user_id_line;
  
  if v_user_id is null then 
    return;
  end if;

  v_new_points := v_current_points + p_points;
  
  -- Simple Level Up Logic
  -- Beginner < 100
  -- Intermediate < 300
  -- Advanced >= 300
  if v_new_points >= 300 then
    update public.users set points = v_new_points, level = 'Advanced' where id = v_user_id;
  elseif v_new_points >= 100 and v_current_level = 'Beginner' then
    update public.users set points = v_new_points, level = 'Intermediate' where id = v_user_id;
  else
    update public.users set points = v_new_points where id = v_user_id;
  end if;
  
  -- Update activity log? (Optional, handled by app)
end;
$$ language plpgsql;
