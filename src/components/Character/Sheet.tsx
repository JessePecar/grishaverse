import React, { useState } from 'react';
import { characterClasses } from "@/constants/Character";
import { Typography, TextField, ButtonGroup, Button, Container } from "@mui/material";
import { Character } from '@/stores/interfaces/Character';


export const Sheet: React.FC<{
  title: string, 
  isEdit: boolean,
}> = ({title, isEdit}) => {

  const [selectedClass, setSelectedClass] = useState<number | undefined>();
  const [selectedSubclass, setSelectedSubclass] = useState<number | undefined>();
  const [character, setCharacter] = useState<Character>({});

  const onClassSelect = (id: number) => {
    setSelectedSubclass(undefined);
    fieldChange(undefined, 'subClass');

    if (id === selectedClass){
      setSelectedClass(undefined);
      fieldChange(undefined, 'class');
      return;
    }
    fieldChange(id, 'class');
    setSelectedClass(id);
  };

  const onSublassSelect = (id: number) => {
    if (id === selectedSubclass) {
      setSelectedSubclass(undefined);
      fieldChange(undefined, 'subClass');
      return;
    }
    fieldChange(id, 'subClass');
    setSelectedSubclass(id);
  };

  const fieldChange = (val: string | number | undefined, field: string) => {
    setCharacter({
      ...character,
      [field]: val
    });

    
  }

  return (
    <Container>
      <div className="w-full p-4 flex flex-wrap space-y-6">
        <div className="w-1/2 flex items-end">
          <Typography variant='h4'>{title}</Typography>
        </div>
        <div className='w-1/2 flex px-4'>
          <TextField 
            variant='standard' 
            className="flex-1" 
            label="Name" 
            value={character.name} 
            onChange={val => fieldChange(val.currentTarget.value, 'name')} 
          />
        </div>
        <div className='w-1/2'>
          <Typography className="text-center">Class</Typography>
          <div className="flex justify-center">
            <ButtonGroup disabled={isEdit} variant='text' title="Select your character type">
              {characterClasses.map(cc => {
                return (
                  <Button 
                    variant={selectedClass === cc.id ? 'contained' : undefined}
                    onClick={() => onClassSelect(cc.id)}
                    key={cc.id} 
                    title={cc.description}>
                    {cc.name}
                  </Button>
                );
                })
              }
            </ButtonGroup>
          </div>
        </div>
        <div className='w-1/2'>
          <Typography className="text-center">Specialty</Typography>
          <div className="flex justify-center">
            <ButtonGroup disabled={isEdit} variant='text' title="Select your character's specialty">
              {selectedClass !== undefined && characterClasses[selectedClass].subClass.map(sc => {
                return (
                  <Button 
                    variant={selectedSubclass === sc.id ? 'contained' : undefined}
                    onClick={() => onSublassSelect(sc.id)}
                    key={sc.id} 
                    title={sc.description}>
                    {sc.name}
                  </Button>
                )
              })
            
              }
            </ButtonGroup>
          </div>
        </div>
        <div className='w-1/2 flex px-4'>
          <TextField
            className="flex-1"
            variant='standard'
            label="Heritage"
            value={character.heritage} 
            onChange={val => fieldChange(val.currentTarget.value, 'heritage')}
          />
        </div>
        <div className='w-1/2 flex px-4'>
          <TextField
            className="flex-1"
            variant='standard'
            label="Background"
            value={character.background} 
            onChange={val => fieldChange(val.currentTarget.value, 'background')}
          />
        </div>
        <div className='w-full flex px-4'>
          <TextField
            variant='standard'
            className="flex-1"
            label="Look"
            value={character.look} 
            onChange={val => fieldChange(val.currentTarget.value, 'look')}
          />
        </div>
      </div>
    </Container>
  )
}